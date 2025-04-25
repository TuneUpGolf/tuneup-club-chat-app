module.exports = (mongoose) => {
  const userSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        unique: true,
        index: true
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      country: {
        type: String,
      },
      country_code: {
        type: String,
      },
      dial_code: {
        type: String,
      },
      phone: {
        type: String,
      },
      avatar: {
        type: String,
        default: null,
      },
      lang: {
        type: String,
        default: 'en',
      },
      plan_id: {
        type: String,
      },
      plan_expired_date: {
        type: Date,
      },
      active_status: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      },
      logo: {
        type: String,
        default: null,
      },
    },
    {
      timestamps: false,
      collection: "users",
    }
  );

  return mongoose.model("User", userSchema);
};
