# midic

command to read midi data

# usage

```
midic help
  Show this message.
midic list
  Show available midi devices.
midic open PORT
  Open PORT and print events.

  -k KEY --key KEY
    Group data by KEY into persistent state.

  -t KEY:VALUE --threshold KEY:VALUE
    Remove data from persistent state where the data at KEY is less than or
    equal to VALUE.

```

# install

```
npm install -g midic
```
