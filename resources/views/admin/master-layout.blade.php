<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Kien Booking Administrator</title>
        @include('admin.modules.css')
    </head>
    {{--
    `body` tag options:

      Apply one or more of the following classes to to the body tag
      to get the desired effect

      * sidebar-collapse
      * sidebar-mini
    --}}
    <body class="hold-transition sidebar-mini">
        <div class="wrapper">
            {{-- Navbar --}}
            @include('admin.modules.navbar')
            {{-- /.navbar --}}

            {{-- Main Sidebar Container --}}
            @include('admin/modules.sidebar')
            {{-- /.Main Sidebar Container --}}

            {{-- Content Wrapper. Contains page content --}}
            <div class="content-wrapper">
                {{-- Content Header (Page header) --}}
                @include('admin.modules.content-header')
                {{-- /.content-header --}}

                {{-- Main content --}}
                <div class="content">
                    <div class="container-fluid">
                        @yield('content')
                    </div>
                    {{-- /.container-fluid --}}
                </div>
                {{-- /.content --}}
            </div>
            {{-- /.content-wrapper --}}

            {{-- Control Sidebar --}}
            @include('admin.modules.control-sidebar')
            {{-- /.control-sidebar --}}

            {{-- Main Footer --}}
            @include('admin.modules.footer')
            {{-- /.Main Footer --}}
        </div>
        {{-- ./wrapper --}}
        <div class="toast-container position-fixed bottom-0 end-0 p-3"></div>

        {{-- REQUIRED SCRIPTS --}}
        @include('admin.modules.script')
    </body>
</html>
