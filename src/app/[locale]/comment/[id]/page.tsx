import CommentModal from "@/components/module/CommentModal";

function CommentPage({ params }) {
  const { locale, id } = params;

  return (
    <div>
      <CommentModal postId={id} locale={locale} />
    </div>
  );
}

export default CommentPage;
