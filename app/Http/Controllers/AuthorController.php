<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use App\Http\Resources\AuthorResource;

class AuthorController extends Controller
{
    /**
     * Returns a collection of all authors.
     */
    public function index()
    {
        $authors = Author::all();

        return AuthorResource::collection($authors);
    }

    /**
     * Returns details of a specific author.
     */
    public function show($id)
    {
        $author = Author::findOrFail($id);

        return new AuthorResource($author);
    }

    /**
     * Creates a new author based on the request data.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'gender' => 'required|string',
            'age' => 'required|integer',
            'country' => 'required|string',
            'genre' => 'required|string',
        ]);

        $author = Author::create($validatedData);

        return new AuthorResource($author);
    }

    /**
     * Updates an existing author based on the request data.
     */
    public function update(Request $request, $id)
    {
        $author = Author::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'string',
            'gender' => 'string',
            'age' => 'integer',
            'country' => 'string',
            'genre' => 'string',
        ]);

        $author->update($validatedData);

        return new AuthorResource($author);
    }
}
