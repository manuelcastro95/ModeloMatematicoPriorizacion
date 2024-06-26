<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AddUsuarioInicialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
    		'name' => 'Manuel Castro',
    		'email' => 'admin@admin.com',
    		'password' => Hash::make('developer95'),
    	]);
        DB::table('users')->insert([
    		'name' => 'Calificador 1',
    		'email' => 'calificador1@gmail.com',
    		'password' => Hash::make('calificador1'),
    	]);
        DB::table('users')->insert([
    		'name' => 'Calificador 2',
    		'email' => 'calificador2@gmail.com',
    		'password' => Hash::make('calificador2'),
    	]);
        DB::table('users')->insert([
    		'name' => 'Calificador 3',
    		'email' => 'calificador3@gmail.com',
    		'password' => Hash::make('calificador3'),
    	]);

    }
}
