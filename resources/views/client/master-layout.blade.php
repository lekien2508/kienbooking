<!DOCTYPE html>
<html lang="vi">
    <head>
    <meta charset="UTF-8">
    <meta name="description" content="Sona Template">
    <meta name="keywords" content="Sona, unica, creative, html">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sona | Template</title>
    {{-- Google Font --}}
    @include('client.modules.google-fonts')
    {{-- Css Styles --}}
    @include('client.modules.css')
    </head>
    <body>
        {{-- Page Preloader --}}
        <div id="preloder">
            <div class="loader"></div>
        </div>

        {{-- Offcanvas Menu Section Begin --}}
        @include('client.modules.canvas-menu')
        {{-- Offcanvas Menu Section End --}}

        {{-- Header Section Begin --}}
        @include('client.modules.header')
        {{-- Header End --}}

        {{-- Hero Section Begin --}}
        @include('client.modules.carousel')
        {{-- Hero Section End --}}

        {{-- Body Content Begin --}}
        @yield('content')
        {{-- Body Content End --}}

        {{-- Footer Section Begin --}}
        @include('client.modules.footer')
        {{-- Footer Section End --}}

        {{-- Search model Begin --}}
        @include('client.modules.canvas-search')
        {{-- Search model end --}}

        {{-- Js Plugins --}}
        @include('client.modules.script')
    </body>
</html>
