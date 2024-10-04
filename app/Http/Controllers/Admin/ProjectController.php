<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProjectRequest;
use App\Models\Admin\ProjectModel;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index()
    {
        return view('admin.project.project');
    }

    public function fetch()
    {
        $projects = ProjectModel::all();
        return response()->json(['projects' => $projects]);
    }

    public function create(ProjectRequest $request)
    {
        $project = $request->all();
        $project['slug'] = Str::slug($project['name']);
        ProjectModel::create($project);
        return response()->json([
            'title' => 'Tạo Thông Tin Dự Án Thành Công!',
            'success_content' => 'Dự Án Mới Đã Được Tạo Trên Bảng.'
        ]);
    }

    public function update(ProjectRequest $request)
    {
        $data = $request->all();
        $project = ProjectModel::find($data['id']);
        $data['slug'] = Str::slug($data['name']);
        $project->update($data);
        return response()->json([
            'title' => 'Cập Nhật Thông Tin Thành Công!',
            'success_content' => 'Thông Tin Dự Án Đã Cập Nhật Thành Công Trên Bảng'
        ]);
    }

    public function change(Request $request){
        $data = $request->all();
        $project = ProjectModel::find($data['id']);
        $project->update($data);
        return response()->json([
            'title' => 'Cập Nhật Trạng Thái Dự Án Thành Công!',
            'success_content' => 'Trạng Thái Dự Án Đã Được Cập Nhật'
        ]);
    }

    public function delete(Request $request)
    {
        $id = $request->only('id');
        $project = ProjectModel::find($id['id']);
        if($project){
            $project->delete();
            return response()->json([
                'title' => 'Xóa Thông Tin Dự Án Thành Công!',
                'success_content' => 'Dự Án Đã Được Xoá'
            ]);
        }else{
            return response()->json([
                'title' => 'Xóa Thông Tin Dự Án Thất Bại!',
                'fail_content' => 'Dự Án Chưa Được Xoá. Vui Lòng Kiểm Tra Lại'
            ]);
        }
    }
}
