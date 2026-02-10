"use client";

import { ChevronLeftIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import PhoneFrame from "../../../components/PhoneFrame";
import TabBar from "../../../components/TabBar";
import styles from "./comments.module.css";

export default function CommentsPage() {
  const params = useParams();
  const kasseId = params.id as string;
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { id: 1, author: "Anna M.", time: "2h sedan", text: "Fantastisk kasse! Så många fina kläder.", likes: 12 },
    { id: 2, author: "Erik S.", time: "4h sedan", text: "Blev så nöjd med mitt besök häromdagen!", likes: 8 },
    { id: 3, author: "Maria L.", time: "1d sedan", text: "Rekommenderar verkligen att besöka denna kasse.", likes: 15 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "Du",
      time: "Nu",
      text: commentText,
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <PhoneFrame title="Kommentarer">
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link
            href={`/walkingclosets/kasse/${kasseId}`}
            className={styles.backLink}
          >
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
            <span>Tillbaka</span>
          </Link>

          <h1 className={styles.title}>Kommentarsfält kasse</h1>
        </header>

        {/* Comments list */}
        <section className={styles.commentsList}>
          {/* Lofi */}
          <div data-lofi-only="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={styles.lofiComment} />
            ))}
          </div>

          {/* Hifi */}
          <div data-hifi-only="true">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                author={comment.author}
                time={comment.time}
                text={comment.text}
                likes={comment.likes}
              />
            ))}
          </div>
        </section>

        {/* Input area - Hifi only */}
        <form className={styles.inputArea} onSubmit={handleSubmit} data-hifi-only="true">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Skriv en kommentar..."
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!commentText.trim()}
            aria-label="Skicka kommentar"
          >
            <PaperAirplaneIcon className={styles.sendIcon} aria-hidden="true" />
          </button>
        </form>

        <TabBar active="find" />
      </div>
    </PhoneFrame>
  );
}

function CommentItem({
  author,
  time,
  text,
  likes,
}: {
  author: string;
  time: string;
  text: string;
  likes: number;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <article className={styles.comment}>
      <div className={styles.commentHeader}>
        <div className={styles.avatar} />
        <div className={styles.meta}>
          <div className={styles.author}>{author}</div>
          <div className={styles.time}>{time}</div>
        </div>
      </div>
      <p className={styles.commentText}>{text}</p>
      <button
        type="button"
        className={liked ? styles.likeButtonActive : styles.likeButton}
        onClick={handleLike}
      >
        <HeartIcon className={styles.likeIcon} aria-hidden="true" />
        <span className={styles.likeCount}>{likeCount}</span>
      </button>
    </article>
  );
}
