import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
// import { sendEmail } from '@/helpers/mailer';
import { connect } from '@/db-config/db-config';
import User from '@/models/users.models';

connect();

export async function POST(request: NextRequest) {
  // console.log('POST', request);
  try {
    const reqBody = await request.json();
    const { firstName, lastName, username, email, password } = reqBody;

    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    // save new user
    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email

    // await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: 'User account created successfully',
      success: true,
      data: savedUser,
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
