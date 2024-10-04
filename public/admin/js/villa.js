$(document).ready(function (){
    // Start Set up csrf header from meta tag
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    //End Set up csrf header

    //Start create datatable and binding datas from database by ajax to view
    $('#tableVilla').DataTable({
        ajax:{
            url: '/administrator/fetch-villas',
            dataSrc: 'villas',
            type: 'GET'
        },
        columns:[
            {data: 'id', title: 'ID', class: 'd-none'},
            {
                data: 'name',
                title: 'Tên Dự Án',
                class: 'col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 py-1 editable-cell',
                // Create more attribute for cell
                createdCell: function (td, data){
                    $(td).attr('id', 'name' + data)
                }
                // End createdCell
            },
            {
                data: 'province',
                title: 'Tỉnh/Thành Phố',
                class: 'col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 py-1 editable-cell',
                createdCell: function (td, data){
                    $(td).attr('id', 'province' + data)
                }
            },
            {
                data: 'address',
                title: 'Địa Chỉ',
                class: 'col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 py-1 editable-cell',
                createdCell: function (td, data){
                    $(td).attr('id', 'address' + data)
                }
            },
            {
                data: 'status',
                title: 'Trạng Thái',
                class: 'col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 py-1 editable-cell',
                //Render something in column
                render: function(data){
                    if(data === 1){
                        return 'Hoạt Động';
                    }else{
                        return 'Không Hoạt Động';
                    }
                }
                //End render
            },
            {
                data: 'created_at',
                title: 'Ngày Tạo',
                class: 'col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 py-1',
                render: function (data){
                    const date = new Date(data);
                    const day = date.getDate();
                    const month = date.getMonth()+1;
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                }
            },
            {
                data: 'updated_at',
                title: 'Ngày Sửa',
                class: 'col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 py-1',
                render: function (data){
                    const date = new Date(data);
                    const day = date.getDate();
                    const month = date.getMonth()+1;
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                }
            },
            {
                data: null,
                class: 'py-1',
                render: function(){
                    let col = `
                        <div class="d-flex justify-content-center gap-2">
                            <a href='#' class="align-self-center" id='buttonHideVilla' data-bs-toggle="tooltip" data-bs-title="Ẩn Dự Án"><i class="fas fa-eye-slash"></i></a>
                            <a href='#' id='buttonEditVilla' data-bs-toggle="tooltip" data-bs-title="Chỉnh Sửa Dự Án"><i class="fas fa-edit"></i></a>
                            <a href='#' id='buttonDeleteVilla' data-bs-target="#modalDeleteVilla" data-bs-toggle="tooltip" data-bs-title="Xóa Dự Án"><i class="fas fa-trash-alt"></i></a>
                        </div>
					`;
                    return col;
                }
            }
        ],
        // This feature will be callled when datatable draw table. This is create bootstrap 5 tooltip for action icons
        drawCallback: function (){
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            // const tooltipTriggerList2 = document.querySelectorAll('[data-bs-toggle-tooltip="tooltip"]');
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        },
        //End drawcallback tooltip
        paging: true, // pagination
        searching: true, // searching and filter
        order: [[0, 'desc']], // sort
        info: true, // info of rows in table
        autoWidth: false,
        columnDefs:[{ // more handling for column, this is terminate ordering for the last column
            "orderable": false,
            "targets": -1
        }]
        // lengthChange: false,
        // responsive: true,
    });
    // End create dataTable

    // Start create modal new villa
    $(document).on('click', '#buttonOpenVillaModal', function(e){
        e.preventDefault();
        let row = $(this).closest('tr');
        let rowData = $('#tableVilla').DataTable().row(row).data(); // Get data in all cells of this row
        // Create modal with attribute
        const modalCreateVilla = $('<div>').addClass('modal fade modalOpenVilla')
            .attr('id', 'modalCreateVilla')
            .attr('tabindex', '-1')
            .attr('aria-hidden', 'true');
        // Create complete modal's structure
        modalCreateVilla.html(`
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Thêm Villa Mới</h1>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <form id="formCreateVilla" enctype="multipart/form-data">
                                <div class="form-group row">
                                    <div class="col">
                                        <label for="villaName" class="font-weight-normal form-label">Tên Villa:</label>
                                        <input type="text" class="form-control form-control-sm" id="villaName" name="name">
                                        <p id="nameError" class="text-danger"></p>
                                    </div>
                                    <div class="col">
                                        <label for="villaType" class="font-weight-normal form-label">Loại Villa:</label>
                                        <select class="form-select form-select-sm" name="type" id="villaType">
                                            <option value="">Chọn loại villa</option>
                                            <option value="Đơn Lập">Đơn Lập</option>
                                            <option value="Song Lập">Song Lập</option>
                                            <option value="Tứ Lập">Tứ Lập</option>
                                            <option value="Liền Kề">Liền Kề</option>
                                            <option value="Shophouse">Shophouse</option>
                                            <option value="Biệt Thự Nhà Vườn">Biệt Thự Nhà Vườn</option>
                                        </select>
                                        <p id="typeError" class="text-danger"></p>
                                    </div>
                                    <div class="col">
                                        <label for="villaProject" class="font-weight-normal">Dự Án:</label>
                                        <select class="form-select form-select-sm" name="type" id="villaProject">
                                            <option value="">Chọn Dự Án</option>
                                        </select>
                                        <p id="projectError" class="text-danger"></p>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-4 col-lg-2">
                                        <label for="villaFloor" class="font-weight-normal">Số tầng:</label>
                                        <input type="text" class="form-control form-control-sm" id="villaFloor" name="floor">
                                        <p id="floorError" class="text-danger"></p>
                                    </div>

                                    <div class="col-4 col-lg-2">
                                        <label for="villaArea" class="font-weight-normal text-nowrap">Diện tích(m2):</label>
                                        <input type="text" class="form-control form-control-sm" id="villaArea" name="area">
                                        <p id="areaError" class="text-danger"></p>
                                    </div>
                                    <div class="col-4 col-lg-3">
                                        <label for="villaView" class="font-weight-normal">View:</label>
                                        <input type="text" class="form-control form-control-sm" id="villaView" name="view">
                                        <p id="viewError" class="text-danger"></p>
                                    </div>
                                    <div class="col-12 col-lg-5">
                                        <p class="font-weight-normal">Trạng Thái:</p>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="status" value="1" checked>
                                            <label class="form-check-label font-weight-normal" for="active">Hoạt Động</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="status" value="0">
                                            <label class="form-check-label font-weight-normal" for="inactive">Tạm Dừng</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col">
                                        <label for="villaImages" class="font-weight-normal">Ảnh:</label>
                                        <div class="dropzone">
                                            <div class="fallback">
                                                <input type="file" class="form-control form-control-sm" id="villaImages" name="images" multiple>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="villaLocation" class="font-weight-normal">Vị trí (link Google Maps):</label>
                                    <input type="text" class="form-control form-control-sm" id="villaLocation" name="location">
                                </div>
                                <div class="form-group">
                                    <label for="villaNote" class="font-weight-normal">Ghi chú:</label>
                                    <textarea class="form-control form-control-sm" id="villaNote" name="note" rows="3"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a class="btn btn-secondary btn-sm" id="buttonCloseModalCreate" href="" data-bs-dismiss="modal">Đóng</a>
                        <a class="btn btn-success btn-sm" id="buttonCreateVilla" href="">Tạo Dự Án</a>
                    </div>
                </div>
            </div>
        `);
        //

        $('.container-fluid').append(modalCreateVilla);
        // Create new backdrop static bootstrap modal with attribute
        const modal = new bootstrap.Modal(document.getElementById('modalCreateVilla'), {
            backdrop: 'static',
            keyboard: false
        });
        modal.show();
        // Call function to binding data to projects select tag
        fetchProjects();
    });
    // End create modal new villa

    // Start fetch data projects to select tag of modal create villa
    function fetchProjects(){
        $.ajax({
            url: 'fetch-modal-villas',
            type: 'GET',
            success: function (response){
                // console.log(response.projects);
                for(let i in response.projects){
                    $('#villaProject').append(`
                        <option value="${response.projects[i].id}">${response.projects[i].name}</option>
                    `);
                }
            },
            error: function (err){
                alert(err.responseText);
            }
        });
    }
    // End fetch data

    // Start creating new villa
    $('#buttonCreateVilla').on('click', function(e){
        e.preventDefault();
        $('#formCreateVilla p').text('');
        let name = $('#villaName').val();
        let province = $('#provinceName').val();
        let address = $('#villaAddress').val();
        let status = $('input[name="status"]:checked').val();
        $.ajax({
            url: 'create-villa',
            type: 'POST',
            data: {name: name, province: province, address: address, status: status},
            success: function (response){
                createToastNotification(response.title, response.success_content);
                $('#tableVilla').DataTable().ajax.reload();
            },
            error: function (data){
                //errorMessages assign to JSON response of errors which were automatically sent from Laravel form request
                let errorMessages = data.responseJSON.errors;

                //If there are validation for name or province or address, assign their items to id. If not, assign ''
                $('#nameError').text(errorMessages.name ? errorMessages.name[0] : '');
                $('#provinceError').text(errorMessages.province ? errorMessages.province[0] : '');
                $('#addressError').text(errorMessages.address ? errorMessages.address[0] : '');

                //Use for loop if there are many input forms need to display validation
                // for(let field in errorMessages) {
                //     console.log(errorMessages[field][0]);
                //     let errorMessage = errorMessages[field][0];
                //     let errorElement = $(`#${field}Error`);
                //     if (errorElement.text().trim() === '') {
                //         errorElement.text(errorMessage);
                //     }
                // }
            }
        });
    });
    // End creating new villa

    // Start close modal Create with reset form to empty
    $('#buttonCloseModalCreate').on('click', function(e){
        $('#formCreateVilla')[0].reset();
        $('#formCreateVilla p').text('');
    });
    // End close modal Create

    // Start edit row
    $(document).on('click', '#buttonEditVilla', function(e){
        e.preventDefault();
        let row = $(this).closest('tr'); // Select closest <tr> tag (select this <tr>)
        let anotherRows = $(this).closest('tr').siblings(); // Select remaining rows, not this row
        row.find('td:not(.editable-cell)').removeClass('py-1').addClass('py-2'); // Find into td which don't have class editable-cell and change some classes
        let cells = row.find('.editable-cell'); // Assign cells to td which has class editable-cell in this row
        cells.each(function () { // Change cells on row to form input by each loop
            let cellData = $(this).text(); // Get original text
            let cellID = $(this).attr('id'); //Get id
            $(this).data('villa-originaldata', cellData);
            $(this).addClass('p-0');
            if($(this).index() === cells.length) { // Check the last td (column/cell) which has class editable-cell and index equal length of cells
                let dropdownlist;
                if (cellData === 'Hoạt Động') {
                    dropdownlist = `
                        <select class="form-select form-select-sm">
                            <option value="1" selected>Hoạt Động</option>
                            <option value="0">Không Hoạt Động</option>
                        </select>
                    `;
                }
                else if (cellData === 'Không Hoạt Động') {
                    dropdownlist = `
                        <select class="form-select form-select-sm">
                            <option value="1">Hoạt Động</option>
                            <option value="0" selected>Không Hoạt Động</option>
                        </select>
                    `;
                }
                $(this).html(dropdownlist);
            }
            else { // Some remain cells which have class editable-cell will change to input:text with some attribute for bootstrap 5 popover
                let input = `
                    <input type='text' id='${cellID}' class='form-control form-control-sm' value='${cellData}' tabindex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="focus">
                `;
                $(this).html(input);
            }
        });
        // Make new button and dispose old tooltip
        let updateButton = `<a href='#' id='buttonUpdateVilla' data-bs-toggle="tooltip" data-bs-title="Áp Dụng Sửa"><i class="fas fa-play"></i></a>`;
        let cancelButton = `<a href='#' id='buttonCancelVilla' data-bs-toggle="tooltip" data-bs-title="Hủy Sửa"><i class="fas fa-undo"></i></a>`;

        //Get button tooltips if they were available
        let tooltipEditVilla = bootstrap.Tooltip.getInstance(row.find('#buttonEditVilla'));
        let tooltipDeleteVilla = bootstrap.Tooltip.getInstance(row.find('#buttonDeleteVilla'));
        if (tooltipEditVilla && tooltipDeleteVilla) { // Check if they are available before, will be disposed
            tooltipEditVilla.dispose();
            tooltipDeleteVilla.dispose();
        }
        // Change button
        row.find('#buttonEditVilla').replaceWith(updateButton);
        row.find('#buttonDeleteVilla').replaceWith(cancelButton);
        // Create new tooltip for new button
        let tooltipUpdateVilla = new bootstrap.Tooltip(row.find('#buttonUpdateVilla'));
        let tooltipCancelVilla = new bootstrap.Tooltip(row.find('#buttonCancelVilla'));
        //
        returnOriginal(anotherRows); // Call this function for another rows, to return them to original data when click to a selected row
    });
    // End edit row

    // Start create delete modal by click delete button
    $(document).on('click', '#buttonDeleteVilla', function(e){
        e.preventDefault();
        let row = $(this).closest('tr');
        let rowData = $('#tableVilla').DataTable().row(row).data(); // Get data in all cells of this row
        // Create modal with attribute
        const modalDeleteVilla = $('<div>').addClass('modal fade modalDelete')
            .attr('id', 'modalDeleteVilla')
            .attr('tabindex', '-1')
            .attr('aria-hidden', 'true');
        // Create complete modal's structure
        modalDeleteVilla.html(`
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Modal title</h1>
                        <button type="button" id="buttonCloseModalDelete" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Bạn có chắc muốn xóa Dự Án này không?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="buttonCloseModalDelete" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="buttonHandleDeleteVilla" class="btn btn-primary" data-villa-id="${rowData.id}">Xóa</button>
                    </div>
                </div>
            </div>
        `);
        $('.container-fluid').append(modalDeleteVilla);
        // Create new backdrop static bootstrap modal with attribute
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteVilla'), {
            backdrop: 'static',
            keyboard: false
        });
        modal.show();
    });
    //End create delete modal

    // Start function remove delete modal
    function removeModalDelete(){
        $('.modalDelete').modal('hide'); // Hide modal
        $('.modalDelete').on('hidden.bs.modal', event => { // event after modal was hidden complete
            $('.modal-backdrop').remove(); // remove backdrop
            $('.modalDelete').remove(); // remove modal
        });
    }
    // End function remove delete modal

    // Start close modal when click x button
    $(document).on('click', '#buttonCloseModalDelete', function (e){
        e.preventDefault();
        removeModalDelete(); // Call removeModalDelete function
    });
    // End close modal when click x button

    // Start close modal when click close button
    $(document).on('click', '#buttonHandleDeleteVilla', function (e){
        e.preventDefault();
        let id = $(this).data('villa-id');
        $.ajax({
            url: 'delete-villa',
            type: 'DELETE',
            data: {id: id},
            success: function (response){
                if(response.success_content){
                    createToastNotification(response.title, response.success_content);
                    removeModalDelete();
                    $('#tableVilla').DataTable().ajax.reload();
                }else{
                    createToastNotification(response.title, response.fail_content);
                    removeModalDelete();
                }
            },error:function(err){
                alert(err.responseText);
            }
        });
    })
    // End close modal when click close button

    // Start update row
    $(document).on('click', '#buttonUpdateVilla', function(e){
        e.preventDefault();
        let row = $(this).closest('tr');
        let rowData = $('#tableVilla').DataTable().row(row).data();
        let id = rowData.id;
        row.find('input').popover('dispose'); // Dispose popover of input if they are available
        let name = row.find('input:eq(0)').val();
        let province = row.find('input:eq(1)').val();
        let address = row.find('input:eq(2)').val();
        // Get tooltips if they are available
        let tooltipUpdateVilla = bootstrap.Tooltip.getInstance(row.find('#buttonUpdateVilla'));
        let tooltipCancelVilla = bootstrap.Tooltip.getInstance(row.find('#buttonCancelVilla'));
        $.ajax({
            url: 'update-villa',
            type: 'PUT',
            data: {id: id, name: name, province: province, address: address, status: status},
            success: function (response){
                createToastNotification(response.title, response.success_content);
                $('#tableVilla').DataTable().ajax.reload();
                // Check status and dispose
                if (tooltipUpdateVilla && tooltipCancelVilla) {
                    tooltipUpdateVilla.dispose();
                    tooltipCancelVilla.dispose();
                }
            },
            error:function(data){
                let errorMessages = data.responseJSON.errors;
                const fieldMapping = { // Create array to assign value row data
                    name: rowData.name,
                    province: rowData.province,
                    address: rowData.address
                };
                for(let field in errorMessages) { // a loop for items in error messages json
                    let errorMessage = errorMessages[field][0];
                    let input = $(`input[id='${field}${fieldMapping[field]}']`); // Assign input id
                    input.attr('data-bs-content', errorMessage);
                    input.popover('show'); // Show error popover
                }
                // Handle hide and show tooltip of update butoon when hover
                row.find('#buttonUpdateVilla').mouseover(function(){
                    tooltipUpdateVilla.show();
                });
                row.find('#buttonUpdateVilla').mouseleave(function(){
                    tooltipUpdateVilla.hide();
                });
            }
        });
    });
    // End update rơ

    // Start cancel editing row
    $(document).on('click', '#buttonCancelVilla', function(e){
        e.preventDefault();
        let row = $(this).closest('tr');
        returnOriginal(row);
    });
    // End cancel editing row

    // Click change page, return row to original row and remove popover
    // $('#tableVilla').on('page.dt', function() {
    //     let rows = $('#tableVilla').DataTable().rows().nodes();
    //     rows.each(function() {
    //         if($(this).has('input')){
    //             // let row1 = Array.from($(this));
    //             returnOriginal($(this));
    //         }
    //     });
    // });
    //

    // Start click paginate button to return original row
    $(document).on('click', '.paginate_button:not(.disabled)', function(e) {
        e.preventDefault();
        //Just for number page
        // let pageNum = $(this).text(); // Get the number of page has been clicked
        // $('#tableVilla').DataTable().page(pageNum - 1).draw('page'); // Trigger event "page.dt" just
        let rows = $('#tableVilla').DataTable().rows().nodes();
        rows.each(function() {
            if($(this).has('input')){
                returnOriginal($(this));
            }
        });
    });
    // End click pageniate button

    // Start click search form to return original row
    $('#tableVilla_filter input').on('click', function() {
        let rows = $('#tableVilla').DataTable().rows().nodes();
        rows.each(function() {
            if ($(this).has('input')) {
                returnOriginal($(this));
            }
        });
    });
    // End click search

    // Start return form values to original text when click cancel button or another edit button
    function returnOriginal(row){
        row.find('input').popover('dispose');
        row.find('td:not(.editable-cell)').removeClass('py-2').addClass('py-1');
        let cells = row.find('.editable-cell');
        cells.each(function(){
            let originalData = $(this).data('villa-originaldata');
            $(this).removeClass('p-0');
            $(this).html(originalData);
        });
        row.each(function(){
            let editButton = `<a href='#' id='buttonEditVilla' data-bs-toggle="tooltip" data-bs-title="Chỉnh Sửa Dự Án"><i class="fas fa-edit"></i></a>`;
            let deleteButton = `<a href='#' id='buttonDeleteVilla' data-bs-toggle="tooltip" data-bs-target="#modalDeleteVilla" data-bs-title="Xóa Dự Án"><i class="fas fa-trash-alt"></i></a>`;

            if($(this).find('#buttonUpdateVilla').length > 0 && $(this).find('#buttonCancelVilla').length > 0){
                const tooltipUpdateVilla = bootstrap.Tooltip.getInstance($(this).find('#buttonUpdateVilla'));
                const tooltipCancelVilla = bootstrap.Tooltip.getInstance($(this).find('#buttonCancelVilla'));
                if (tooltipUpdateVilla && tooltipCancelVilla) {
                    tooltipUpdateVilla.dispose();
                    tooltipCancelVilla.dispose();
                }
            }
            $(this).find('#buttonCancelVilla').replaceWith(deleteButton);
            $(this).find('#buttonUpdateVilla').replaceWith(editButton);
            const tooltipEditVilla = new bootstrap.Tooltip($(this).find('#buttonEditVilla'));
            const tooltipDeleteVilla = new bootstrap.Tooltip($(this).find('#buttonDeleteVilla'));
        });
    }
    // End return form

    // Start create Dynamic Toasts Notification
//     function createToastNotification(title, content) {
//         const toast = $('<div>').addClass('toast')
//             .attr('role', 'alert')
//             .attr('aria-live', 'assertive')
//             .attr('aria-atomic', 'true');
//         toast.html(`
//             <div class="toast-header">
// <!--                <img src="..." class="rounded me-2" alt="...">-->
//                 <strong class="me-auto">${title}</strong>
//                 <small>11 mins ago</small>
//                 <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//             </div>
//             <div class="toast-body">
//                 ${content}
//             </div>
//         `);
//         $('.toast-container').append(toast);
//         const bootstrapToast = new bootstrap.Toast(toast);
//         bootstrapToast.show();
//     }
    // End create Dynamic Toast Notification
});
