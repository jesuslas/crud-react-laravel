<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TicketsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tickets')->insert([
            [
                'ticket_pedido' => 'ticket 2',
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'ticket_pedido' => 'ticket 1',
                'user_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()

                
            ]
        ]);
    }
}
