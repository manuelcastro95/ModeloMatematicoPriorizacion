<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Evaluacion extends Model
{
    protected $table = 'evaluaciones';
    protected $fillable = ['criterio_id', 'valor', 'evaluador_id','caso_uso_id'];

    public function casoUso(){
        return $this->belongsTo(CasosUso::class);
    }

    public function user(){
        return $this->belongsTo(User::class, 'evaluador_id');
    }
}
