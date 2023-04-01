export interface BlogPostProps {
  title: string;
  content: string;
  authorUsername: string;
  creationTime: number;
  postID?: string; // TODO-JAROD: Do we need it?
}
