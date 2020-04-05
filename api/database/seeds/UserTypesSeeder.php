<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 

class UserTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_types')->insert([
            [
            'name' => 'admin',
           
            ],
            [
                'name' => 'user',
            
            ]
        ]);
    }
}
