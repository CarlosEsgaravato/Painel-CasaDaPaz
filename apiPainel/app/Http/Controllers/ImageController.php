<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $image = $request->file('image');
        $filename = time() . '.' . $image->getClientOriginalExtension();
        $path = $image->storeAs('images', $filename, 'public');

        $image = new Image();
        $image->filename = $filename;
        $image->save();

        return response()->json(['success' => 'Image uploaded successfully.', 'filename' => $filename]);
    }

    public function index()
    {
        $images = Image::all();
        return response()->json($images);
    }

    public function destroy($id)
    {
        $image = Image::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        // Delete the image file from storage
        Storage::disk('public')->delete('images/' . $image->filename);

        // Delete the image record from the database
        $image->delete();

        return response()->json(['message' => 'Image deleted successfully'], 200);
    }
}
