<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tickets;

class TicketsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userId = $request->query("userId");
        if($userId){
            return Tickets::with("user")->where("user_id",$userId)->get();
        }
        return Tickets::with("user")->get();
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
        $tickets = new Tickets;
        $tickets->ticket_pedido = json_decode($request->body)->ticketPedido;
        $tickets->user_id = json_decode($request->body)->userId;
        $tickets->save();
        return $tickets;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        $ticket = Tickets::findOrFail($id);
        $ticket->ticket_pedido = property_exists(json_decode($request->body),"ticketPedido") ? json_decode($request->body)->ticketPedido: $ticket->ticket_pedido;
        $ticket->user_id = property_exists(json_decode($request->body),"userId") ? json_decode($request->body)->userId: $ticket->user_id;
        $ticket->status = property_exists(json_decode($request->body),"status")? json_decode($request->body)->status: $ticket->status;
        $ticket->save();
        
        return $ticket;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ticket = Tickets::findOrFail($id);
        $ticket->delete();
        return $ticket;
    }
}
