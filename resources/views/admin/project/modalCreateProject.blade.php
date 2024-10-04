<div class="modal fade" id="modalCreateProject" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5">Tạo Dự Án Mới</h1>
{{--				<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">--}}
{{--                    <span aria-hidden="true">&times;</span>--}}
{{--                </button>--}}
			</div>
			<div class="modal-body">
                <div class="mb-3">
                    <form id="formCreateProject">
{{--                        @csrf--}}
                        <div class="form-group">
                            <label for="project" class="font-weight-normal">Tên Dự Án:</label>
                            <input type="text" class="form-control form-control-sm" id="projectName" name="name">
                            <p id="nameError" class="text-danger"></p>
                        </div>
                        <div class="form-group">
                            <label for="province" class="font-weight-normal">Tỉnh/Thành Phố:</label>
                            <input type="text" class="form-control form-control-sm" id="provinceName" name="province">
                            <p id="provinceError" class="text-danger"></p>
                        </div>
                        <div class="form-group">
                            <label for="address" class="font-weight-normal">Địa Chỉ:</label>
                            <input type="text" class="form-control form-control-sm" id="projectAddress" name="address">
                            <p id="addressError" class="text-danger"></p>
                        </div>
                        <div class="form-group form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="status" value="1" checked>
                            <label class="form-check-label font-weight-normal" for="active">Hoạt Động</label>
                        </div>
                        <div class="form-group form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="status" value="0">
                            <label class="form-check-label font-weight-normal" for="inactive">Tạm Dừng</label>
                        </div>
                    </form>
                </div>
			</div>
			<div class="modal-footer">
                <a class="btn btn-secondary btn-sm" id="buttonCloseModalCreateProject" href="" data-bs-dismiss="modal">Đóng</a>
                <a class="btn btn-success btn-sm" id="buttonCreateProject" href="">Tạo Dự Án</a>
			</div>
		</div>
	</div>
</div>
