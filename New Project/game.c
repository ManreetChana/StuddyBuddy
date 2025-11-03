#include <stdio.h>
#include <string.h>
#include "game.h"
#include "utils.h"

void play_game(Flashcard *deck) {
    int score = 0, total = 0;
    char user_input[256];

    for (Flashcard *card = deck; card != NULL; card = card->next) {
        printf("\nQuestion: %s\nYour answer: ", card->question);
        get_line(user_input, sizeof(user_input));

        if (strcmp(user_input, card->answer) == 0) {
            printf("✅ Correct!\n");
            score++;
        } else {
            printf("❌ Incorrect. Answer was: %s\n", card->answer);
        }
        total++;
    }

    printf("\n🎉 You scored %d out of %d!\n", score, total);
}
