#ifndef DECK_H
#define DECK_H

typedef struct Flashcard {
    char question[256];
    char answer[256];
    struct Flashcard *next;
} Flashcard;

Flashcard* load_deck(const char *filename);
void free_deck(Flashcard *deck);

#endif
