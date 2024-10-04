$(document).ready(function (){
    // Start Set up csrf header from meta tag
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    //End Set up csrf header

    //Start create datatable and binding datas from database by ajax to view
    $('#tableProject').DataTable({
        ajax:{
            url: '/administrator/fetch-projects',
            dataSrc: 'projects',
            type: 'GET'
        },
        columns:[
            {data: 'id', title: 'ID', class: 'd-none'},
            {
                data: 'name',
                title: '<span class="text-nowrap">Tên Dự Án</span>',
                class: 'col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 py-1 editable-cell',
                // Create more attribute for cell
                createdCell: function (td, data){
                    $(td).attr('id', 'name' + data)
                }
                // End createdCell
            },
            {
                data: 'province',
                title: '<span class="text-nowrap">Tỉnh/Thành Phố</span>',
                class: 'col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 py-1 editable-cell',
                createdCell: function (td, data){
                    $(td).attr('id', 'province' + data)
                }
            },
            {
                data: 'address',
                title: '<span class="text-nowrap">Địa Chỉ</span>',
                class: 'col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 py-1 editable-cell',
                createdCell: function (td, data){
                    $(td).attr('id', 'address' + data)
                }
            },
            // {
            //     data: 'status',
            //     title: '<span class="text-nowrap">Trạng Thái</span>',
            //     class: 'col-2 col-sm-1 col-md-1 col-lg-1 col-xl-1 py-1 editable-cell',
            //     //Render something in column
            //     render: function(data){
            //         // if(data === 1){
            //         //     return 'Hoạt Động';
            //         // }else{
            //         //     return 'Không Hoạt Động';
            //         // }
            //         let string = `
            //             <div class="form-switch d-flex justify-content-center">
            //                 <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" ${data === 1 ? 'checked' : ''}>
            //             </div>
            //         `;
            //         return string;
            //     }
            //     //End render
            // },
            {
                data: 'created_at',
                title: '<span class="text-nowrap">Ngày Tạo</span>',
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
                title: '<span class="text-nowrap">Ngày Sửa</span>',
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
                data: 'status',
                class: 'col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 py-1',
                render: function(data){
                    let col = `
                        <div class="d-flex justify-content-center gap-2">
                            <a href='#' id='buttonEditProject' data-bs-toggle="tooltip" data-bs-title="Chỉnh Sửa Dự Án"><i class="fas fa-edit"></i></a>
                            <a href='#' id='buttonDeleteProject' data-bs-target="#modalDeleteProject" data-bs-toggle="tooltip" data-bs-title="Xóa Dự Án"><i class="fas fa-trash-alt"></i></a>
                            <span class="form-switch" data-bs-toggle="tooltip" data-bs-title="${data === 1 ? 'Tắt Dự Án' : 'Bật Dự Án'}">
                                <input class="form-check-input" type="checkbox" role="switch" id="switchStatusProject" ${data === 1 ? 'checked' : ''}>
                            </span>
                        </div>
					`;
                    return col;
                }
            }
        ],
        // This feature will be callled when datatable draw table.
        drawCallback: function (){
            // This is create bootstrap 5 tooltip for action icons
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

            //Change status row when binding data to table
            $('#tableProject').DataTable().on('draw.dt', function () {
                $('#tableProject').DataTable().rows().every(function () {
                    let row = this.node();
                    let switchStatus = $(row).find('#switchStatusProject');
                    if (switchStatus.is(':not(:checked)')) {
                        $(row).find('td').addClass('text-secondary');
                        $(row).find('td:last-child div a i').addClass('text-secondary');
                        $('#buttonEditProject, #buttonDeleteProject', row).prop('disabled', true);
                    }
                });
            });
        },
        //End drawcallback tooltip
        paging: true, // pagination
        searching: true, // searching and filter
        order: [[0, 'desc']], // sort
        info: true, // info of rows in table
        autoWidth: false,
        columnDefs:[{ // more handling for column, this is terminate ordering for the last column
            "orderable": false,
            "targets": -1,
        }]
        // lengthChange: false,
        // responsive: true,
    });

    // End create dataTable

    // Start creating new project
    $('#buttonCreateProject').on('click', function(e){
        e.preventDefault();
        $('#formCreateProject p').text('');
        let name = $('#projectName').val();
        let province = $('#provinceName').val();
        let address = $('#projectAddress').val();
        let status = $('input[name="status"]:checked').val();
        $.ajax({
            url: 'create-project',
            type: 'POST',
            data: {name: name, province: province, address: address, status: status},
            success: function (response){
                createToastNotification(response.title, response.success_content);
                $('#tableProject').DataTable().ajax.reload();
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
    // End creating new project

    // Start close modal Create with reset form to empty
    $('#buttonCloseModalCreateProject').on('click', function(e){
        $('#formCreateProject')[0].reset();
        $('#formCreateProject p').text('');
    });
    // End close modal Create

    // Start edit row
    $(document).on('click', '#buttonEditProject', function(e){
        e.preventDefault();
        let row = $(this).closest('tr'); // Select closest <tr> tag (select this <tr>)
        let anotherRows = $(this).closest('tr').siblings(); // Select remaining rows, not this row
        row.find('td:not(.editable-cell)').removeClass('py-1').addClass('py-2'); // Find into td which don't have class editable-cell and change some classes
        let cells = row.find('.editable-cell'); // Assign cells to td which has class editable-cell in this row
        cells.each(function () { // Change cells on row to form input by each loop
            let cellData = $(this).text(); // Get original text
            let cellID = $(this).attr('id'); //Get id
            $(this).data('project-originaldata', cellData);
            $(this).addClass('p-0');
            let input = `
                <input type='text' id='${cellID}' class='form-control form-control-sm' value='${cellData}' tabindex="0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="focus">
            `;
            $(this).html(input);
            // }
        });
        // Make new button and dispose old tooltip
        let updateButton = `<a href='#' id='buttonUpdateProject' data-bs-toggle="tooltip" data-bs-title="Áp Dụng Sửa"><i class="fas fa-play"></i></a>`;
        let cancelButton = `<a href='#' id='buttonCancelProject' data-bs-toggle="tooltip" data-bs-title="Hủy Sửa"><i class="fas fa-undo"></i></a>`;

        //Get button tooltips if they were available
        let tooltipEditProject = bootstrap.Tooltip.getInstance(row.find('#buttonEditProject'));
        let tooltipDeleteProject = bootstrap.Tooltip.getInstance(row.find('#buttonDeleteProject'));
        if (tooltipEditProject && tooltipDeleteProject) { // Check if they are available before, will be disposed
            tooltipEditProject.dispose();
            tooltipDeleteProject.dispose();
        }
        // Change button
        row.find('#buttonEditProject').replaceWith(updateButton);
        row.find('#buttonDeleteProject').replaceWith(cancelButton);
        // Create new tooltip for new button
        let tooltipUpdateProject = new bootstrap.Tooltip(row.find('#buttonUpdateProject'));
        let tooltipCancelProject = new bootstrap.Tooltip(row.find('#buttonCancelProject'));
        //
        returnOriginal(anotherRows); // Call this function for another rows, to return them to original data when click to a selected row
    });
    // End edit row

    // Start create delete modal by click delete button
    $(document).on('click', '#buttonDeleteProject', function(e){
        e.preventDefault();
        let row = $(this).closest('tr');
        let rowData = $('#tableProject').DataTable().row(row).data(); // Get data in all cells of this row
        // Create modal with attribute
        const modalDeleteProject = $('<div>').addClass('modal fade modalDelete')
            .attr('id', 'modalDeleteProject')
            .attr('tabindex', '-1')
            .attr('aria-hidden', 'true');
        // Create complete modal's structure
        modalDeleteProject.html(`
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
                        <button type="button" id="buttonHandleDeleteProject" class="btn btn-primary" data-project-id="${rowData.id}">Xóa</button>
                    </div>
                </div>
            </div>
        `);
        $('.container-fluid').append(modalDeleteProject);
        // Create new backdrop static bootstrap modal with attribute
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteProject'), {
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
    $(document).on('click', '#buttonHandleDeleteProject', function (e){
        e.preventDefault();
        let id = $(this).data('project-id');
        $.ajax({
            url: 'delete-project',
            type: 'DELETE',
            data: {id: id},
            success: function (response){
                if(response.success_content){
                    createToastNotification(response.title, response.success_content);
                    removeModalDelete();
                    $('#tableProject').DataTable().ajax.reload();
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
    $(document).on('click', '#buttonUpdateProject', function(e){
        e.preventDefault();
        let row = $(this).closest('tr');
        let rowData = $('#tableProject').DataTable().row(row).data();
        let id = rowData.id;
        row.find('input').popover('dispose'); // Dispose popover of input if they are available
        let name = row.find('input:eq(0)').val();
        let province = row.find('input:eq(1)').val();
        let address = row.find('input:eq(2)').val();
        // Get tooltips if they are available
        let tooltipUpdateProject = bootstrap.Tooltip.getInstance(row.find('#buttonUpdateProject'));
        let tooltipCancelProject = bootstrap.Tooltip.getInstance(row.find('#buttonCancelProject'));
        $.ajax({
            url: 'update-project',
            type: 'PUT',
            data: {id: id, name: name, province: province, address: address},
            success: function (response){
                createToastNotification(response.title, response.success_content);
                $('#tableProject').DataTable().ajax.reload();
                // Check status and dispose
                if (tooltipUpdateProject && tooltipCancelProject) {
                    tooltipUpdateProject.dispose();
                    tooltipCancelProject.dispose();
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
                row.find('#buttonUpdateProject').mouseover(function(){
                    tooltipUpdateProject.show();
                });
                row.find('#buttonUpdateProject').mouseleave(function(){
                    tooltipUpdateProject.hide();
                });
            }
        });
    });
    // End update row

    // Start cancel editing row
    $(document).on('click', '#buttonCancelProject', function(e){
        e.preventDefault();
        let row = $(this).closest('tr');
        returnOriginal(row);
    });
    // End cancel editing row

    // Start change status
    $(document).on('change', '#switchStatusProject', function (e){
        let row = $(this).closest('tr');
        console.log($(this).is(':checked'));
        let rowData = $('#tableProject').DataTable().row(row).data();
        returnOriginal(row);
        let tooltipStatusProject = bootstrap.Tooltip.getInstance(row.find('span'));
        if($(this).is(':checked')){
            row.find('td').removeClass('text-secondary');
            row.find('td:last-child div a i').removeClass('text-secondary');
            $('#buttonEditProject, #buttonDeleteProject', row).prop('disabled', false);
            if (tooltipStatusProject) {
                tooltipStatusProject.dispose();
            }
            tooltipStatusProject = new bootstrap.Tooltip(row.find('span'), {
                'title': 'Tắt Dự Án'
            });
            tooltipStatusProject.show();
        }else{
            row.find('td').addClass('text-secondary');
            row.find('td:last-child div a i').addClass('text-secondary');
            $('#buttonEditProject, #buttonDeleteProject', row).prop('disabled', true);
            if (tooltipStatusProject) {
                tooltipStatusProject.dispose();
            }
            tooltipStatusProject = new bootstrap.Tooltip(row.find('span'), {
                'title': 'Bật Dự Án'
            });
            tooltipStatusProject.show();
        }
        $.ajax({
            url: 'change-status-project',
            type: 'PUT',
            data: {id: rowData.id, status: $(this).is(':checked') ? 1 : 0},
            success: function (response){
                createToastNotification(response.title, response.success_content);
            },
            error: function (err){
                err.responseText;
            }
        });
    })
    // End change status

    // Click change page, return row to original row and remove popover
    // $('#tableProject').on('page.dt', function() {
    //     let rows = $('#tableProject').DataTable().rows().nodes();
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
        // $('#tableProject').DataTable().page(pageNum - 1).draw('page'); // Trigger event "page.dt" just
        let rows = $('#tableProject').DataTable().rows().nodes();
        rows.each(function() {
            if($(this).has('input')){
                returnOriginal($(this));
            }
        });
    });
    // End click pageniate button

    // Start click search form to return original row
    $('#tableProject_filter input').on('click', function() {
        let rows = $('#tableProject').DataTable().rows().nodes();
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
            let originalData = $(this).data('project-originaldata');
            $(this).removeClass('p-0');
            $(this).html(originalData);
        });
        row.each(function(){
            let editButton = `<a href='#' id='buttonEditProject' data-bs-toggle="tooltip" data-bs-title="Chỉnh Sửa Dự Án"><i class="fas fa-edit"></i></a>`;
            let deleteButton = `<a href='#' id='buttonDeleteProject' data-bs-toggle="tooltip" data-bs-target="#modalDeleteProject" data-bs-title="Xóa Dự Án"><i class="fas fa-trash-alt"></i></a>`;

            if($(this).find('#buttonUpdateProject').length > 0 && $(this).find('#buttonCancelProject').length > 0){
                const tooltipUpdateProject = bootstrap.Tooltip.getInstance($(this).find('#buttonUpdateProject'));
                const tooltipCancelProject = bootstrap.Tooltip.getInstance($(this).find('#buttonCancelProject'));
                if (tooltipUpdateProject && tooltipCancelProject) {
                    tooltipUpdateProject.dispose();
                    tooltipCancelProject.dispose();
                }
            }
            $(this).find('#buttonCancelProject').replaceWith(deleteButton);
            $(this).find('#buttonUpdateProject').replaceWith(editButton);
            const tooltipEditProject = new bootstrap.Tooltip($(this).find('#buttonEditProject'));
            const tooltipDeleteProject = new bootstrap.Tooltip($(this).find('#buttonDeleteProject'));
        });
    }
    // End return form

    // Start create Dynamic Toasts Notification
    function createToastNotification(title, content) {
        const toast = $('<div>').addClass('toast')
            .attr('role', 'alert')
            .attr('aria-live', 'assertive')
            .attr('aria-atomic', 'true');
        toast.html(`
            <div class="toast-header">
<!--                <img src="..." class="rounded me-2" alt="...">-->
                <strong class="me-auto">${title}</strong>
                <small>11 mins ago</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${content}
            </div>
        `);
        $('.toast-container').append(toast);
        const bootstrapToast = new bootstrap.Toast(toast);
        bootstrapToast.show();
    }
    // End create Dynamic Toast Notification
});
