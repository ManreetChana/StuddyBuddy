#include <stdio.h>
#include "deck.h"
#include "game.h"

int main() {
    Flashcard *deck = load_deck("cards.txt");
    if (deck == NULL) {
        printf("Failed to load deck.\n");
        return 1;
    }

    play_game(deck);
    free_deck(deck);

    return 0;
}
