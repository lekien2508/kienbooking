@extends('admin.master-layout')
@section('content')

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <a class="btn btn-primary" id="buttonOpenProjectModal" href="#" data-bs-toggle="modal" data-bs-target="#modalCreateProject">Thêm Dự Án</a>
                </div>
                {{-- /.card-header --}}
                <div class="card-body">
                    <table id="tableProject" class="table table-responsive table-bordered table-hover dataTable dtr-inline">

                    </table>
                </div>
                {{-- /.card-body --}}
            </div>
            {{-- /.card --}}
        </div>
        {{-- /.col --}}
    </div>
    {{-- /.row --}}
    @include('admin/project/modalCreateProject')
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

@push('Project JS')
    <script src="{{ asset('/admin/js/project.js') }}"></script>
@endpush
