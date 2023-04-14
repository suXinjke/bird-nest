export default async function Sum({ a, b }: { a: number; b: number }) {
  await new Promise(res => setTimeout(res, 1000))
  return <div>The sum is {a + b}</div>
}
