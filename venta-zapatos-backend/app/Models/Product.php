<?php
//Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'price',
        'size',
        'image',
        'status',
    ];

    protected $casts = [
        'price' => 'float', // Esto le dice a Laravel que 'price' debe ser tratado como un número flotante
        'status' => 'string', // Asegura que el enum 'status' se envíe como string
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
