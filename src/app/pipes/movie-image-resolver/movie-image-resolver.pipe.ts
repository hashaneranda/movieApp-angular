import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieImageResolver',
})
export class MovieImageResolverPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const isUrl = this.isValidHttpUrl(value);

    if (isUrl) return value;

    return `https://image.tmdb.org/t/p/original/${value}`;
  }

  /**
   * Check string is a url
   * @param urlString url
   * @returns
   */
  isValidHttpUrl(urlString: string) {
    let url;

    try {
      url = new URL(urlString);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }
}
