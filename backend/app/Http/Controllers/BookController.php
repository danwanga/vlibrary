<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Http\Resources\BookResource;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    /**
     * Returns a collection of all books.
     */
    public function index()
    {
        $books = Book::all();

        return BookResource::collection($books);
    }

    /**
     * Returns details of a specific book.
     */
    public function show($id)
    {
        $book = Book::with('author')->findOrFail($id);

        return new BookResource($book);
    }

    /**
     * Creates a new book based on the request data.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'isbn' => 'required|string',
            'author_id' => 'required|exists:authors,id',
        ]);

        $book = Book::create($validatedData);

        return new BookResource($book);
    }

    /**
     * Updates an existing book based on the request data.
     */
    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'string',
            'isbn' => 'string',
            'author_id' => 'exists:authors,id',
        ]);

        $book->update($validatedData);

        return new BookResource($book);
    }

    /**
     * Deletes an existing book based on the request data.
     */
    public function delete($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();

        return response()->json(null, 204);
    }
}
