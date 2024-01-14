import {
  createRenderEffect,
  createSignal,
  onCleanup,
  createMemo,
  untrack,
} from "solid-js";
import {
  parseISO,
  parse,
  isSameDay,
  intlFormatDistance,
  intlFormat,
  differenceInSeconds,
  differenceInMilliseconds,
} from "date-fns";

export enum DateRefreshPercision {
  seconds = 0,
  minutes = 1,
  hours,
  days,
}

export function useCurrentDate(
  percision:
    | (() => DateRefreshPercision)
    | DateRefreshPercision = DateRefreshPercision.minutes
) {
  const [current, setCurrent] = createSignal(new Date());

  const updateInterval = () => {
    switch (typeof percision === "function" ? percision() : percision) {
      case DateRefreshPercision.seconds:
        return 1000;
      case DateRefreshPercision.minutes:
        return 15 * 1000;
      case DateRefreshPercision.hours:
        return 60 * 1000;
      case DateRefreshPercision.days:
        return 60 * 60 * 1000;
    }
  };

  let id: undefined | number;

  const update = () => setCurrent(new Date());

  createRenderEffect(() => {
    if (typeof id !== "undefined") {
      window.clearInterval(id);
      id = undefined;
    }

    const interval = updateInterval();

    const now = new Date();
    if (differenceInMilliseconds(now, untrack(current)) <= interval) {
      update();
    }

    id = window.setInterval(update, interval);
  });

  onCleanup(() => {
    if (typeof id !== "undefined") {
      window.clearInterval(id);
      id = undefined;
    }
  });

  return current;
}

/** Translate the elements with time to human-readable form.
 *
 * @param elements
 */
export function renderLocalTimeOn(elements: Iterable<Element>) {
  const [allPercisionRequired, setAllPercisionRequired] = createSignal<
    DateRefreshPercision[]
  >([], { equals: false });
  const percision = createMemo(() => {
    const arr = allPercisionRequired();
    if (arr.length < 1) {
      return DateRefreshPercision.hours;
    }

    return arr.reduce((p, c) => (p < c ? p : c));
  });
  const date = useCurrentDate(percision);
  const starts = new Date();

  let idx = 0;
  for (const e of elements) {
    if (!(e instanceof HTMLElement)) {
      console.warn(e, "is not a html element can be rendered local time");
      continue;
    }

    const timeFormat = e.dataset.timeFormat ?? "iso";
    if (timeFormat === "local") {
      continue;
    }

    const i = idx++;
    const content = e.hasAttribute('datetime') ? e.getAttribute('datetime') : e.textContent
    const rawDate =
      timeFormat === "iso"
        ? parseISO(content)
        : parse(content, timeFormat, starts);
    e.dataset.raw = rawDate.toISOString();
    e.dataset.timeFormat = "local";

    const percisionOfRawDate = createMemo(() => {
      const seconds = differenceInSeconds(date(), rawDate);
      if (seconds < 60) {
        return DateRefreshPercision.seconds;
      } else if (seconds < 60 * 60) {
        return DateRefreshPercision.minutes;
      } else if (seconds < 60 * 60 * 24) {
        return DateRefreshPercision.hours;
      }
      return DateRefreshPercision.days;
    });

    const fmtString = createMemo(() => {
      if (isSameDay(rawDate, date())) {
        return intlFormatDistance(rawDate, date());
      }
      return intlFormat(rawDate);
    });

    createRenderEffect(() => {
      if (!e.hasAttribute('datetime')) {
        e.setAttribute('datetime', rawDate.toISOString())
      }
    })

    createRenderEffect(() => {
      e.textContent = fmtString();
    });

    createRenderEffect(() => {
      const p = percisionOfRawDate();
      setAllPercisionRequired((x) => {
        x[i] = p;
        return x;
      });
    });
  }
}
