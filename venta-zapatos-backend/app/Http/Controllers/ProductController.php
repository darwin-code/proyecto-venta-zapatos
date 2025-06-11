<?php
//ProductController.php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
    // Mostrar todos los productos
    public function index()
    {
        return Product::with('user')->get();
    }

    // Mostrar productos del usuario autenticado
    public function myProducts()
    {
        return Auth::user()->products;
    }

    // Crear producto
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'size' => 'required|string',
            'status' => 'required|in:available,sold',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
        }

        $product = Auth::user()->products()->create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'size' => $request->size,
            'status' => $request->status,
            'image' => $path ? '/storage/' . $path : null,
        ]);

        return response()->json($product, 201);
    }


    // Ver un producto específico
    public function show($id)
    {
        // Carga el producto y su relación de usuario
        return Product::with('user')->findOrFail($id);
    }

    // Actualizar producto
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // Verificar si el producto pertenece al usuario autenticado
        if ($product->user_id !== Auth::id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'size' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:available,sold',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Opcional: eliminar la imagen vieja si existe
            if ($product->image) {
                $oldImagePath = str_replace('/storage/', '', $product->image);
                \Storage::disk('public')->delete($oldImagePath);
            }
            // Guardar nueva imagen
            $path = $request->file('image')->store('products', 'public');
            $product->image = '/storage/' . $path;
        }

        // Actualizar otros campos si vienen en la solicitud
        $product->fill($request->except('image'));
        $product->save();

        return response()->json($product);
    }


    // Eliminar producto
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Verificar si el producto pertenece al usuario autenticado
        if ($product->user_id !== Auth::id()) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        // Opcional: eliminar la imagen del storage si existe
        if ($product->image) {
            $oldImagePath = str_replace('/storage/', '', $product->image);
            \Storage::disk('public')->delete($oldImagePath);
        }

        $product->delete();

        return response()->json(['message' => 'Producto eliminado correctamente']);
    }
}
