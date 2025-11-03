CC = gcc
CFLAGS = -Wall -std=c99

OBJS = main.o game.o deck.o utils.o

quiz: $(OBJS)
	$(CC) $(CFLAGS) -o quiz $(OBJS)

clean:
	rm -f *.o quiz
