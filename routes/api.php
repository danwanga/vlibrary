<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;

/*
|--------------------------------------------------------------------------
| API Routes for interacting with the backend
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/books', [BookController::class, 'index']); // Get a list of books
Route::get('/book/{id}', [BookController::class, 'show']); // Get details of a specific book
Route::post('/book', [BookController::class, 'store']); // Create a new book
Route::put('/book/{id}', [BookController::class, 'update']); // Update an existing book
Route::delete('book/{id}', [BookController::class, 'delete']); // Delete an existing book

Route::get('/authors', [AuthorController::class, 'index']); // Get a list of authors
Route::get('/author/{id}', [AuthorController::class, 'show']); // Get details of a specific author
Route::post('/author', [AuthorController::class, 'store']); // Create a new author
Route::put('/author/{id}', [AuthorController::class, 'update']); // Update an existing author (Optional)