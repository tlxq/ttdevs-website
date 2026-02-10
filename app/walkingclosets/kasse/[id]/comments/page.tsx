"use client";
import { ChevronLeftIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import PhoneFrame from "../../../components/PhoneFrame";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import styles from "./comments.module.css";

interface Comment {
  id: number;
  author: string;
  time: string;
  content: string;
  likes: number;
}

export default function CommentsPage({ params }: { params: { id: string } }) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Emma Svensson",
      time: "2 timmar sedan",
      content: "Fantastisk kasse! Hittar alltid något unikt här. 🎉",
      likes: 15,
    },
    {
      id: 2,
      author: "Linnea Andersson",
      time: "4 timmar sedan",
      content: "Uppskattar verkligen kvaliteten på plaggen.",
      likes: 8,
    },
    {
      id: 3,
      author: "Sofia Berg",
      time: "6 timmar sedan",
      content: "Bästa kassen i Stockholm! Varmt rekommenderat.",
      likes: 22,
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: "Du",
      time: "Nu",
      content: newComment,
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <PhoneFrame title="Kommentarsfält kasse" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link
            className={styles.backBtn}
            href={`/walkingclosets/kasse/${params.id}`}
            aria-label="Back to kasse"
          >
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
          </Link>
          <h1 className={styles.h1}>Kommentarsfält kasse</h1>
        </header>

        {/* Comments list */}
        <div className={styles.content}>
          {/* Lofi comments */}
          <div data-lofi-only="true">
            <CommentLofi />
            <CommentLofi />
            <CommentLofi />
            <CommentLofi />
          </div>

          {/* Hifi comments */}
          <div data-hifi-only="true">
            {comments.map((comment) => (
              <CommentHifi key={comment.id} comment={comment} />
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className={styles.inputArea}>
          {/* Lofi input */}
          <div className={styles.lofiInput} data-lofi-only="true">
            <div className={styles.lofiInputField} />
            <div className={styles.lofiInputBtn} />
          </div>

          {/* Hifi input */}
          <div className={styles.hifiInput} data-hifi-only="true">
            <input
              type="text"
              className={styles.input}
              placeholder="Skriv en kommentar..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddComment();
                }
              }}
            />
            <button
              type="button"
              className={styles.sendBtn}
              onClick={handleAddComment}
              aria-label="Send comment"
              disabled={!newComment.trim()}
            >
              <PaperAirplaneIcon className={styles.sendIcon} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function CommentLofi() {
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div className={styles.commentAvatar} />
        <div className={styles.commentMeta}>
          <div className={styles.commentAuthor}>Lorem Ipsum</div>
          <div className={styles.commentTime}>Lorem ipsum</div>
        </div>
      </div>
      <div className={styles.commentContent}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
      </div>
      <div className={styles.commentFooter}>
        <div className={styles.commentLike}>
          <div className={styles.commentIcon} />
          <span>12</span>
        </div>
      </div>
    </div>
  );
}

function CommentHifi({ comment }: { comment: Comment }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div className={styles.commentAvatar} />
        <div className={styles.commentMeta}>
          <div className={styles.commentAuthor}>{comment.author}</div>
          <div className={styles.commentTime}>{comment.time}</div>
        </div>
      </div>
      <div className={styles.commentContent}>{comment.content}</div>
      <div className={styles.commentFooter}>
        <button
          type="button"
          className={`${styles.commentLike} ${liked ? styles.commentLikeLiked : ""}`}
          onClick={() => setLiked(!liked)}
        >
          <HeartIcon className={styles.commentIconHifi} aria-hidden="true" />
          <span>{liked ? comment.likes + 1 : comment.likes}</span>
        </button>
      </div>
    </div>
  );
}
