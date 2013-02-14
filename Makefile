TARGETS=$(patsubst %.haml,%.html,$(wildcard *.haml))

default: $(TARGETS)
	echo $(TARGETS)

%.html: %.haml
	haml $< > $@
