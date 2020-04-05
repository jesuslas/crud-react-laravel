<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
            'name' => 'admin',
            'email' => 'co@co.com',
            'password' => '123',
            'userType_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()

        ],
        [
            'name' => 'user',
            'email' => 'co@co.com',
            'password' => '123',
            'userType_id' => 2,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()

            ]
        ]);
    }
}
