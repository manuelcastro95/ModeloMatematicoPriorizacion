<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CasosUso extends Model
{
    protected $fillable = ['nombre'];
    protected $table = 'casos_uso';
    
    public function criterios()
    {
        return $this->hasMany(Criterio::class);
    }

    public function evaluaciones()
    {
        return $this->hasMany(Evaluacion::class);
    }
}
