import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      desc,
      milage,
      phone,
      price,
      Myseller,
      image,
      constructionDate,
      category,
      rules,
      amenities,
    } = body;

    const session = await getServerSession(req);

    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }
    if (
      !title ||
      !desc ||
      !milage ||
      !phone ||
      !price ||
      !Myseller ||
      !image ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا تمام فیلد ها را وارد کنید" },
        { status: 400 }
      );
    }

    const newProfile = await Profile.create({
      title,
      desc,
      milage,
      phone,
      price: +price,
      image,
      constructionDate,
      category,
      rules,
      Myseller,
      amenities,
      userId: new Types.ObjectId(user._id),
    });

    console.log(newProfile);

    return NextResponse.json(
      { message: "آگهی با موفقیت ثبت شد" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "اتصال به سرور با خطا مواجه شده!" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();

    const {
      _id,
      title,
      desc,
      milage,
      phone,
      price,
      Myseller,
      image,
      constructionDate,
      category,
      rules,
      amenities,
    } = await req.json();

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }

    if (
      !_id ||
      !title ||
      !desc ||
      !milage ||
      !phone ||
      !price ||
      !Myseller ||
      !image ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا تمام فیلد ها را وارد کنید" },
        { status: 400 }
      );
    }
    const profile = await Profile.findOne({ _id });
    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        { error: "دسترسی شما به این آگهی محدود شده است" },
        {
          status: 403,
        }
      );
    }

    profile.title = title;
    profile.desc = desc;
    profile.milage = milage;
    profile.phone = phone;
    profile.price = price;
    profile.Myseller = Myseller;
    profile.image = image;
    profile.category = category;
    profile.amenities = amenities;
    profile.rules = rules;
    profile.constructionDate = constructionDate;

    profile.save();

    return NextResponse.json(
      { message: "بروز رسانی آگهی موفقیت آمیز بود!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "اتصال به سرور با خطا مواجه شده!" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     await connectDB();
//     const profile = await Profile.find().select("-userId");

//     return NextResponse.json({ data: profile }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "خطایی در سرور رخ داده است" },
//       { status: 500 }
//     );
//   }
// }
