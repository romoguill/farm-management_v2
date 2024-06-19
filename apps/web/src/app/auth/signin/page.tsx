function SignInPage() {
  return (
    <div className='space-y-4'>
      <div>
        <h1>Sign In</h1>
        <label>
          Email
          <input />
        </label>
        <label>
          Password
          <input />
        </label>
      </div>
      <div>
        <a href={`${process.env.NEXT_PUBLIC_API_URL}/signin/google`}>
          Sign in with Google
        </a>
      </div>
    </div>
  );
}

export default SignInPage;
