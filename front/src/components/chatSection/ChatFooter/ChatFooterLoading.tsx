import { PresentationalChatFooter } from "./PresentationalChatFooter";

type Props = {
  height: number | string;
};

export function ChatFooterLoading({ height }: Props) {
  return <PresentationalChatFooter height={height} loading />;
}
