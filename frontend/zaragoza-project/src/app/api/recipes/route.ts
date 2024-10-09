import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Recipes from '@/models/recipes';

export async function GET() {
    await dbConnect();
  const tasks = await Recipes.find({});
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const { title } = await request.json();
  await dbConnect();
  const newTask = await Recipes.create({ title });
  return NextResponse.json(newTask, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await dbConnect();
  await Recipes.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
}