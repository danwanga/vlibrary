<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Author;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Log;

class AuthorControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testIndex()
    {
        $authors = Author::factory()->count(5)->create();

        $response = $this->get('/api/authors');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
    }

    public function testShow()
    {
        $author = Author::factory()->create();

        $response = $this->get("/api/authors/{$author->id}");

        Log::debug("/api/authors/{$author->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $author->id,
            'name' => $author->name,
        ]);
    }

    public function testStore()
    {
        $data = [
            'name' => $this->faker->name,
            'gender' => $this->faker->randomElement(['male', 'female']),
            'age' => $this->faker->numberBetween(20, 70),
            'country' => $this->faker->country,
            'genre' => $this->faker->word,
        ];

        $response = $this->post('/api/authors', $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('authors', $data);
    }

    public function testUpdate()
    {
        $author = Author::factory()->create();
        $data = ['name' => 'Updated Name'];

        $response = $this->put("/api/authors/{$author->id}", $data);

        $response->assertStatus(200);
        $this->assertDatabaseHas('authors', [
            'id' => $author->id,
            'name' => 'Updated Name',
        ]);
    }
}
