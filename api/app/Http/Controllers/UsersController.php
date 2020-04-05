<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Users;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Users::with('userTypes')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new Users;
         $user->name = json_decode($request->body)->name;
         $user->password = json_decode($request->body)->password;
         $user->email = json_decode($request->body)->email;
         $user->userType_id = json_decode($request->body)->userTypes;
         $user->save();
         return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Users::where('id', $id)->get()[0];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $users = Users::findOrFail($id);
        $users->name = property_exists(json_decode($request->body),"name") ? json_decode($request->body)->name: $users->name;
        $users->password = property_exists(json_decode($request->body),"password") ? json_decode($request->body)->password: $users->password;
        $users->email = property_exists(json_decode($request->body),"email")? json_decode($request->body)->email: $users->email;
        $users->userType_id = property_exists(json_decode($request->body),"userTypes")? json_decode($request->body)->userTypes: $users->userType_id;
        $users->save();
        
        return $users;
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $users = Users::findOrFail($id);
        $users->delete();
        
        return $users;
    }
   
     /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request  $request)
    {
        $name = json_decode($request->body)->user;
        $password = json_decode($request->body)->password;
        $user = Users::where('name', $name)->where("password",$password)->with('userTypes')->firstOrFail();
        return $user;
    }
}
