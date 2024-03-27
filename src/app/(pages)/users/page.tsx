async function getUserData() {
  const request = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!request.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await request.json();
  return response;
}
export default async function UserPage() {
  const users = await getUserData();

  return (
    <>
      <div>
        <h1>User page in testing</h1>
        <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
          {users.map((user: any, key: number) => (
            <li key={key}>
              {user.name} / {user.username}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
