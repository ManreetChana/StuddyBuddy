#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "deck.h"

Flashcard* load_deck(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (!file) return NULL;

    Flashcard *head = NULL;
    Flashcard *tail = NULL;
    char line[512];

    while (fgets(line, sizeof(line), file)) {
        Flashcard *card = malloc(sizeof(Flashcard));
        if (!card) break;

        char *sep = strchr(line, '|');
        if (!sep) continue;
        *sep = '\0';
        strcpy(card->question, line);
        strcpy(card->answer, sep + 1);
        card->answer[strcspn(card->answer, "\n")] = '\0'; // remove newline
        card->next = NULL;

        if (!head) head = card;
        else tail->next = card;

        tail = card;
    }

    fclose(file);
    return head;
}

void free_deck(Flashcard *deck) {
    while (deck) {
        Flashcard *temp = deck;
        deck = deck->next;
        free(temp);
    }
}
