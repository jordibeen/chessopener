release-prod:
	npm run build
	@aws s3 sync "build/" "s3://www.chessopener.com/"
	@aws cloudfront create-invalidation --distribution-id E3DL0WOX8WW1DS --paths "/*"
