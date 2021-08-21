<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$user = User::find(1);
        $user= Auth::user();
        return $user->tasks->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Task::create([
            'task' => $request->task,
            'status' => $request->status,
            'user_id' => Auth::user()->id
        ])->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        
        if ($task) {
            $task->task = $request->task;
            $task->status = $request->status;
            $task->save();
            return $task;            
        }
        return "task not found";  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $id)
    {
        if ($id) {
            $id->delete();
            return "task deleted";            
        }
        return "task not found";
    }
}
