@extends('admin.master-layout')
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Tiện Ích</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Loại Tiện Ích</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Nhóm Tiện Ích</a>
                    </li>
                </ul>
                <div class="card-header">
                    <a class="btn btn-primary" id="buttonOpenUtilityModal" href="#" data-bs-target="#modalCreateUtility">Thêm Tiện Ích</a>
                </div>
                {{-- /.card-header --}}
                <div class="card-body">

                    <table id="tableUtility" class="table table-responsive table-bordered table-hover dataTable dtr-inline">

                    </table>
                </div>
                {{-- /.card-body --}}
            </div>
            {{-- /.card --}}
        </div>
        {{-- /.col --}}
    </div>
    {{-- /.row --}}
@endsection

@push('DataTable CSS')
    <link rel="stylesheet" href="{{ asset('/admin/plugins/datatables-bs5/css/dataTables.bootstrap5.min.css') }}">
    <link rel="stylesheet" href="{{ asset('/admin/plugins/datatables-responsive/new-datatables-responsive/css/responsive.bootstrap5.min.css') }}">
    <link rel="stylesheet" href="{{ asset('/admin/plugins/datatables-buttons/new-datatables-buttons/css/buttons.bootstrap5.min.css') }}">
@endpush

@push('DataTable JS')
    <script src="{{ asset('/admin/plugins/datatables/new-dataTables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-bs5/js/dataTables.bootstrap5.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-responsive/new-datatables-responsive/js/dataTables.responsive.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-responsive/new-datatables-responsive/js/responsive.bootstrap5.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-buttons/new-datatables-buttons/js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-buttons/new-datatables-buttons/js/buttons.bootstrap5.min.js') }}"></script>

@endpush

@push('Utility JS')
    <script src="{{ asset('/admin/js/utility.js') }}"></script>
@endpush
