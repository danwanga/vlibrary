<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Author;

class AuthorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        // Create 10 authors 
        for ($i = 0; $i < 10; $i++) {
            Author::create([
                'name' => $faker->name,
                'gender' => $faker->randomElement(['Male', 'Female']),
                'age' => $faker->numberBetween(18, 80),
                'country' => $faker->country,
                'genre' => $faker->randomElement(['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery']),
            ]);
        }
    }
}
