<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Book;
use App\Models\Author;
use Illuminate\Foundation\Testing\WithFaker;

class BookControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testIndex()
    {
        $books = Book::factory()->count(5)->create();

        $response = $this->get('/api/books');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
    }

    public function testShow()
    {
        $book = Book::factory()->create();

        $response = $this->get("/api/books/{$book->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $book->id,
            'name' => $book->name,
        ]);
    }

    public function testStore()
    {
        $author = Author::factory()->create();
        $data = [
            'name' => $this->faker->sentence,
            'isbn' => $this->faker->isbn13,
            'author_id' => $author->id,
        ];

        $response = $this->post('/api/books', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('books', $data);
    }

    public function testUpdate()
    {
        $book = Book::factory()->create();
        $data = ['name' => 'Updated Name'];

        $response = $this->put("/api/books/{$book->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'name' => 'Updated Name',
        ]);
    }
}
