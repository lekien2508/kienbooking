<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|max:100|unique:tb_projects,name',
            'province' => 'required|max:100',
            'address' => 'required'
        ];
        if($this->isMethod('PUT')){
            $rules['name'] = [
                'required',
                'max:100',
                Rule::unique('tb_projects')->ignore($this->input('id'))
            ];
        }
        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên Dự Án không được để trống',
            'name.unique' => 'Dự Án đã tồn tại',
            'name.max' => 'Tên Dự Án tối đa chỉ được 100 kí tự',
            'province.required' => 'Tên Tỉnh/Thành phố không được để trống',
            'province.max' => 'Tên Tỉnh/Thành phố tối đa chỉ được 100 kí tự',
            'address.required' => 'Địa chỉ không được để trống'
        ];
    }
}
