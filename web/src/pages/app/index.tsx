import { useUser, withPageAuthRequired, getAccessToken } from "@auth0/nextjs-auth0"
import { GetServerSideProps } from "next";
import Link from "next/link";

export default function Home({
  token
}) {
  const { user } = useUser()
  
  return (
    <div>
      <h1>Hello World</h1>
      <p style={{
        maxWidth: 700,
        overflow: 'auto'
      }}>
        {token}
      </p>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <Link href={'/api/auth/'}>Logout</Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
     accessToken
  } = await getAccessToken(context.req, context.res)
  
  return {
    props: {
      token: accessToken
    }
  }
};