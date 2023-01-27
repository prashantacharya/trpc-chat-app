import { trpc } from '../utils/trpc';

export default function ChatPage() {
  const { refetch: refetchChat, data, isLoading, error, } = trpc.chat.list.useQuery();
  const { mutateAsync, isLoading: isAddingChat } = trpc.chat.add.useMutation({
    onSuccess: (data) => {
      console.log(data)
      refetchChat()
    }
  });

  const addMessage = async () => {
    mutateAsync({ message: 'Hello world', name: 'Prashant' });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAddingChat) {
    return <div>Adding chat...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data.map((c) => <p><span>{c.name}:</span> <span>{c.message}</span></p>)}

      <button onClick={addMessage}>Add new message</button>
    </div>
  );
}
