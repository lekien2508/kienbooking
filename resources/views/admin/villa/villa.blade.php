@extends('admin.master-layout')
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <a class="btn btn-primary" id="buttonOpenVillaModal" href="#" data-bs-target="#modalCreateVilla">Thêm Villa</a>
                </div>
                {{-- /.card-header --}}
                <div class="card-body">
                    <table id="tableVilla" class="table table-responsive table-bordered table-hover dataTable dtr-inline">

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

@push('Dropzone CSS')
    <link rel="stylesheet" href="{{ asset('/admin/plugins/dropzone/min/dropzone.min.css') }}">
@endpush

@push('DataTable JS')
    <script src="{{ asset('/admin/plugins/datatables/new-dataTables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-bs5/js/dataTables.bootstrap5.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-responsive/new-datatables-responsive/js/dataTables.responsive.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-responsive/new-datatables-responsive/js/responsive.bootstrap5.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-buttons/new-datatables-buttons/js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ asset('/admin/plugins/datatables-buttons/new-datatables-buttons/js/buttons.bootstrap5.min.js') }}"></script>
@endpush

@push('Dropzone JS')
    <script src="{{ asset('/admin/plugins/dropzone/min/dropzone.min.js') }}"></script>
@endpush

@push('Villa JS')
    <script src="{{ asset('/admin/plugins/jquery-ui/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('/admin/js/villa.js') }}"></script>
@endpush
