<!-- jQuery -->
<script src="{{ asset('admin/plugins/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap -->
{{--<script src="{{ asset('admin/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>--}}
<script src="{{ asset('shared-css/bootstrap5/bootstrap5.bundle.min.js') }}"></script>
{{-- DataTable --}}
@stack('DataTable JS')
@stack('Project JS')
@stack('Dropzone JS')
@stack('Villa JS')
@stack('Utility JS')
<!-- AdminLTE -->
<script src="{{ asset('admin/dist/js/adminlte.js') }}"></script>


<!-- OPTIONAL SCRIPTS -->
{{--<script src="{{ asset('admin/plugins/chart.js/Chart.min.js') }}"></script>--}}
<!-- AdminLTE for demo purposes -->
{{--<script src="{{ asset('admin/dist/js/demo.js') }}"></script>--}}
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
{{--<script src="{{ asset('admin/dist/js/pages/dashboard3.js') }}"></script>--}}
