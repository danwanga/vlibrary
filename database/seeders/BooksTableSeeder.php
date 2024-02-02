<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Author;
use App\Models\Book;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        // Create 10 books 
        for ($i = 0; $i < 10; $i++) {
            Book::create([
                'name' => $faker->sentence(4),
                'isbn' => $faker->isbn13,
                'author_id' => Author::factory()->create()->id,
            ]);
        }
    }
}
